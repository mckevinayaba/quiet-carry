SELECT cron.schedule(
  'selar-poll-every-5-min',
  '*/5 * * * *',
  $$
  SELECT net.http_post(
    url := 'https://nlmmmiyekpdjckvaotvm.supabase.co/functions/v1/selar-poll',
    headers := '{"Content-Type": "application/json"}'::jsonb,
    body := '{}'::jsonb
  ) AS request_id;
  $$
);