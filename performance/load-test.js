import http from 'k6/http';
import { sleep } from 'k6';
export default function() {
  http.get('https://${__ENV.SUBDOMAIN}.${__ENV.DOMAIN}');
  sleep(1);
}