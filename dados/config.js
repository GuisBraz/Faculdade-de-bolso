/*
  FACULDADE DE BOLSO · conexão com o Supabase
  ------------------------------------------------------------
  A anon key é pública por natureza (vai para o navegador de qualquer visitante);
  quem protege os dados são as regras RLS do banco (supabase/schema.sql).
  NUNCA coloque aqui a service_role key.
  Com anonKey vazia, o site funciona no modo local (sem login).
*/
window.FDB_CONFIG = {
  url: "https://zqdpvawnodrhnmntbuvr.supabase.co",
  anonKey: ""
};
