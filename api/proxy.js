import fetch from "node-fetch";

const BACKEND_URL = "http://54.89.44.152:8080"; // seu backend

export default async function handler(req, res) {
    try {
        // Extrai a rota que veio depois de /api
        const path = req.url.replace(/^\/api/, "");
        const backendEndpoint = `${BACKEND_URL}${path}`;

        // Configura o fetch para enviar o mesmo método e corpo
        const response = await fetch(backendEndpoint, {
            method: req.method,
            headers: {
                ...req.headers,
                host: undefined, // remove host para evitar conflito
            },
            body: req.method !== "GET" && req.method !== "HEAD" ? req.body : undefined,
        });

        // Pega o conteúdo do backend
        const contentType = response.headers.get("content-type") || "";
        const data = contentType.includes("application/json")
            ? await response.json()
            : await response.text();

        // Retorna para o front
        res.status(response.status).setHeader("Content-Type", contentType).send(data);

    } catch (err) {
        console.error("Erro no proxy:", err);
        res.status(500).json({ error: "Falha ao acessar backend" });
    }
}
