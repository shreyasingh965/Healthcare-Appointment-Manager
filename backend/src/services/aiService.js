const OpenAI = require("openai");

const client = new OpenAI({
    apiKey: process.env.OPENAI_API_KEY,
});

// Generate Pre-Visit Summary
const generatePreVisitSummary = async (symptoms) => {
    const response = await client.chat.completions.create({
        model: "gpt-4o-mini",
        messages: [
            {
                role: "system",
                content: "You are a medical assistant."
            },
            {
                role: "user",
                content: `Summarize these patient symptoms briefly:\n${symptoms}`
            }
        ],
        max_tokens: 150
    });

    return response.choices[0].message.content;
};

// Generate Post-Visit Summary
const generatePostVisitSummary = async (notes) => {
    const response = await client.chat.completions.create({
        model: "gpt-4o-mini",
        messages: [
            {
                role: "system",
                content: "You are a medical assistant."
            },
            {
                role: "user",
                content: `Create a concise post-visit summary from these doctor notes:\n${notes}`
            }
        ],
        max_tokens: 200
    });

    return response.choices[0].message.content;
};

module.exports = {
    generatePreVisitSummary,
    generatePostVisitSummary
};