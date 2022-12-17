import http.server as server
import socketserver
import sys

class Request_Handler(server.BaseHTTPRequestHandler):
    def _set_response(self):
        response_code = 200
        self.send_response(response_code)
        self.send_header('Access-Control-Allow-Origin', '*')
        self.send_header('Content-type', 'text/html')
        self.end_headers()

    def do_GET(self):
        self._set_response()

def run(PORT, server_class=server.HTTPServer, handler_class=Request_Handler):
    ip_address = "127.0.0.1"
    server_address = (ip_address, PORT)
    httpd = server_class(server_address, handler_class)
    httpd.serve_forever()

if __name__ == "__main__":
    if(len(sys.argv) > 1):
        PORT = int(sys.argv[1])
        UPTIME = int(sys.argv[2])
    else:
        PORT = 8001
        UPTIME = 0.75

    run(PORT)