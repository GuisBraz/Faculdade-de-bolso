-- =====================================================================
-- FACULDADE DE BOLSO · estrutura do banco (Supabase / Postgres)
-- Cole tudo no SQL Editor do projeto e clique em Run. Pode rodar de novo
-- sem problema (é idempotente).
-- Este arquivo NÃO tem dados pessoais: eles entram pelo seed enviado à parte.
-- =====================================================================

-- 1) perfis: papel de cada conta (admin ou visitante)
create table if not exists public.perfis (
  id      uuid primary key references auth.users(id) on delete cascade,
  papel   text not null default 'visitante' check (papel in ('admin','visitante')),
  criado  timestamptz not null default now()
);
alter table public.perfis enable row level security;

-- função auxiliar: o usuário logado é admin?
create or replace function public.is_admin()
returns boolean language sql stable security definer set search_path = public as $$
  select exists (select 1 from public.perfis where id = auth.uid() and papel = 'admin');
$$;
revoke all on function public.is_admin() from public;
grant execute on function public.is_admin() to authenticated;

-- toda conta nova nasce visitante
create or replace function public.novo_perfil()
returns trigger language plpgsql security definer set search_path = public as $$
begin
  insert into public.perfis (id) values (new.id) on conflict (id) do nothing;
  return new;
end $$;
drop trigger if exists ao_criar_usuario on auth.users;
create trigger ao_criar_usuario after insert on auth.users
  for each row execute function public.novo_perfil();
-- contas que já existiam antes deste script
insert into public.perfis (id) select id from auth.users on conflict (id) do nothing;

drop policy if exists "ver o próprio perfil" on public.perfis;
create policy "ver o próprio perfil" on public.perfis for select to authenticated
  using (id = auth.uid() or public.is_admin());
drop policy if exists "só admin altera papel" on public.perfis;
create policy "só admin altera papel" on public.perfis for update to authenticated
  using (public.is_admin()) with check (public.is_admin());
-- (sem política de insert/delete: só o gatilho cria perfis)

-- 2) privado: dados pessoais do Gui (horário, provas, professores, status...)
create table if not exists public.privado (
  chave       text primary key,
  valor       jsonb not null,
  atualizado  timestamptz not null default now()
);
alter table public.privado enable row level security;
drop policy if exists "só admin" on public.privado;
create policy "só admin" on public.privado for all to authenticated
  using (public.is_admin()) with check (public.is_admin());

-- 3) estado: progresso de cada conta (status, provas manuais, módulos, quiz, cartas)
create table if not exists public.estado (
  usuario     uuid not null default auth.uid() references auth.users(id) on delete cascade,
  chave       text not null check (char_length(chave) <= 60),
  valor       jsonb not null,
  atualizado  timestamptz not null default now(),
  primary key (usuario, chave)
);
alter table public.estado enable row level security;
drop policy if exists "cada um no seu" on public.estado;
create policy "cada um no seu" on public.estado for all to authenticated
  using (usuario = auth.uid()) with check (usuario = auth.uid());
-- limita o tamanho de cada valor (~200 KB) para ninguém encher o banco
alter table public.estado drop constraint if exists estado_tamanho;
alter table public.estado add constraint estado_tamanho check (pg_column_size(valor) < 200000);

-- 4) ping: tabela mínima que o "despertador" consulta para o projeto não pausar
create table if not exists public.ping (id int primary key, em timestamptz not null default now());
insert into public.ping (id) values (1) on conflict (id) do nothing;
alter table public.ping enable row level security;
drop policy if exists "ping público" on public.ping;
create policy "ping público" on public.ping for select to anon, authenticated using (true);

-- permissões: anônimo só enxerga o ping
revoke all on public.perfis, public.privado, public.estado from anon;
grant select on public.ping to anon, authenticated;
grant select, update on public.perfis to authenticated;
grant select, insert, update, delete on public.privado, public.estado to authenticated;
