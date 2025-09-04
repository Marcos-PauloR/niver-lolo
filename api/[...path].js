import fetch from "node-fetch";

const BACKEND_URL = "http://54.89.44.152:8080";

export default async function handler(req, res) {
    try {
        const path = req.query.path.join('/');
        const backendEndpoint = `${BACKEND_URL}/${path}`;

        // Body como string
        let body = null;
        if (req.method !== "GET" && req.method !== "HEAD") {
            body = await new Promise((resolve, reject) => {
                let data = '';
                req.on('data', chunk => data += chunk);
                req.on('end', () => resolve(data));
                req.on('error', err => reject(err));
            });
        }

        // Envia requisição
        const response = await fetch(backendEndpoint, {
            method: req.method,
            headers: {
                ...req.headers,
                host: undefined,
                "content-length": body ? Buffer.byteLength(body) : undefined,
            },
            body: body || undefined,
        });

        const contentType = response.headers.get("content-type") || "";
        const data = contentType.includes("application/json")
            ? await response.json()
            : await response.text();

        res.status(response.status).setHeader("Content-Type", contentType).send(data);

    } catch (err) {
        console.error("Erro no proxy:", err);
        res.status(500).json({ error: "Falha ao acessar backend" });
    }
}
