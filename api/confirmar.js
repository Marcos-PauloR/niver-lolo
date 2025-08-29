export default async function handler(req, res) {
    if (req.method !== "POST") {
        return res.status(405).json({ error: "Método não permitido" });
    }

    try {
        const backendResponse = await fetch("http://52.203.153.185:8080/convidados/confirmar", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "Accept": "application/json",
            },
            body: JSON.stringify(req.body),
        });

        const data = await backendResponse.json();

        return res.status(backendResponse.status).json(data);
    } catch (err) {
        console.error("Erro no proxy:", err);
        return res.status(500).json({ error: "Falha ao acessar backend" });
    }
}
