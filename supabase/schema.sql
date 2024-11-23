-- Create tables
create table public.profiles (
    id uuid references auth.users on delete cascade not null primary key,
    created_at timestamp with time zone default timezone('utc'::text, now()) not null,
    email text not null,
    full_name text,
    avatar_url text,
    company_name text,
    subscription_status text default 'free'::text not null check (subscription_status in ('free', 'pro', 'enterprise')),
    subscription_id text
);

create table public.projects (
    id uuid default gen_random_uuid() primary key not null,
    created_at timestamp with time zone default timezone('utc'::text, now()) not null,
    name text not null,
    url text not null,
    description text,
    user_id uuid references public.profiles(id) on delete cascade not null,
    services text[] default '{}',
    target_region text,
    demographics jsonb default '{}'::jsonb,
    updated_at timestamp with time zone default timezone('utc'::text, now()) not null
);

create table public.keywords (
    id uuid default gen_random_uuid() primary key not null,
    created_at timestamp with time zone default timezone('utc'::text, now()) not null,
    keyword text not null,
    volume integer,
    difficulty integer,
    project_id uuid references public.projects(id) on delete cascade not null,
    user_id uuid references public.profiles(id) on delete cascade not null
);

create table public.blog_posts (
    id uuid default gen_random_uuid() primary key not null,
    created_at timestamp with time zone default timezone('utc'::text, now()) not null,
    title text not null,
    content text not null,
    status text default 'draft'::text not null check (status in ('draft', 'published')),
    project_id uuid references public.projects(id) on delete cascade not null,
    user_id uuid references public.profiles(id) on delete cascade not null,
    keyword_id uuid references public.keywords(id) on delete set null
);

-- Enable Row Level Security
alter table public.profiles enable row level security;
alter table public.projects enable row level security;
alter table public.keywords enable row level security;
alter table public.blog_posts enable row level security;

-- Create policies
-- Profiles policies
create policy "Users can view their own profile"
on public.profiles for select
using (auth.uid() = id);

create policy "Users can update their own profile"
on public.profiles for update
using (auth.uid() = id);

-- Projects policies
create policy "Users can view their own projects"
on public.projects for select
using (auth.uid() = user_id);

create policy "Users can create their own projects"
on public.projects for insert
with check (auth.uid() = user_id);

create policy "Users can update their own projects"
on public.projects for update
using (auth.uid() = user_id);

create policy "Users can delete their own projects"
on public.projects for delete
using (auth.uid() = user_id);

-- Keywords policies
create policy "Users can view their own keywords"
on public.keywords for select
using (auth.uid() = user_id);

create policy "Users can create keywords for their projects"
on public.keywords for insert
with check (auth.uid() = user_id);

create policy "Users can update their own keywords"
on public.keywords for update
using (auth.uid() = user_id);

create policy "Users can delete their own keywords"
on public.keywords for delete
using (auth.uid() = user_id);

-- Blog posts policies
create policy "Users can view their own blog posts"
on public.blog_posts for select
using (auth.uid() = user_id);

create policy "Users can create blog posts for their projects"
on public.blog_posts for insert
with check (auth.uid() = user_id);

create policy "Users can update their own blog posts"
on public.blog_posts for update
using (auth.uid() = user_id);

create policy "Users can delete their own blog posts"
on public.blog_posts for delete
using (auth.uid() = user_id);

-- Create functions
create or replace function public.handle_new_user()
returns trigger
language plpgsql
security definer set search_path = public
as $$
begin
  insert into public.profiles (id, email, full_name, avatar_url)
  values (new.id, new.email, new.raw_user_meta_data->>'full_name', new.raw_user_meta_data->>'avatar_url');
  return new;
end;
$$;

-- Create triggers
create trigger on_auth_user_created
  after insert on auth.users
  for each row execute procedure public.handle_new_user();

-- Create indexes
create index projects_user_id_idx on public.projects(user_id);
create index keywords_project_id_idx on public.keywords(project_id);
create index keywords_user_id_idx on public.keywords(user_id);
create index blog_posts_project_id_idx on public.blog_posts(project_id);
create index blog_posts_user_id_idx on public.blog_posts(user_id);
create index blog_posts_keyword_id_idx on public.blog_posts(keyword_id);
