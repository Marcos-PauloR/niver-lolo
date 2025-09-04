import fetch from "node-fetch";

const BACKEND_URL = "http://54.89.44.152:8080"; // seu backend

export default async function handler(req, res) {
    try {
        // Reconstrói a rota completa após /api/
        const path = req.query.path.join('/');
        const backendEndpoint = `${BACKEND_URL}/${path}`;

        // Lê o body corretamente para métodos que não são GET ou HEAD
        let body = null;
        if (req.method !== "GET" && req.method !== "HEAD") {
            body = await new Promise((resolve, reject) => {
                let data = '';
                req.on('data', chunk => data += chunk);
                req.on('end', () => resolve(data));
                req.on('error', err => reject(err));
            });
        }

        // Faz a requisição para o backend
        const response = await fetch(backendEndpoint, {
            method: req.method,
            headers: {
                ...req.headers,
                host: undefined, // remove host para evitar conflito
            },
            body: body || undefined,
        });

        // Detecta tipo de conteúdo
        const contentType = response.headers.get("content-type") || "";
        const data = contentType.includes("application/json")
            ? await response.json()
            : await response.text();

        // Retorna resposta para o frontend
        res.status(response.status).setHeader("Content-Type", contentType).send(data);

    } catch (err) {
        console.error("Erro no proxy:", err);
        res.status(500).json({ error: "Falha ao acessar backend" });
    }
}
