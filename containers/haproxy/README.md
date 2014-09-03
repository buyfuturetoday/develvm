HA proxy for HTTP traffic
=========================

1. Configure the bacends in haproxy.cfg. The rows looks like this: `server SERVER_NAME IP:PORT check`.
`SERVER_NAME` is only used for logging purposes.
2. The stats logins also needs to be updated in haproxy.cfg, see `stats auth admin:password`.
3. Build: `docker build --rm .`
4. Run: `docker run -d -p 80:80 [IMAGE ID]`

The amount of logging is controlled by: `log 127.0.0.1 local0 debug` in haproxy.cfg
