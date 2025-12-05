// Simula a IA analisando a foto e texto
const analyzeMeal = async (description, imageFile) => {
    // Em produção, aqui chamaríamos a OpenAI Vision API ou TensorFlow

    // Lógica Mockada Inteligente:
    const text = description.toLowerCase();

    let analysis = {
        calories: 0,
        isInflammatory: false,
        macros: { protein: 0, carbs: 0, fats: 0 },
        feedback: ""
    };

    // Regras básicas do Lieve (Exemplo)
    if (text.includes('pão') || text.includes('trigo') || text.includes('açúcar')) {
        analysis.isInflammatory = true;
        analysis.calories = 350;
        analysis.feedback = "Atenção: Glúten detectado. Pode causar inchaço.";
        analysis.macros = { protein: 8, carbs: 60, fats: 5 };
    } else if (text.includes('ovo') || text.includes('frango') || text.includes('salada')) {
        analysis.isInflammatory = false;
        analysis.calories = 400;
        analysis.feedback = "Ótima escolha! Rico em proteínas e baixo potencial inflamatório.";
        analysis.macros = { protein: 35, carbs: 10, fats: 15 };
    } else {
        // Padrão
        analysis.calories = 250;
        analysis.feedback = "Refeição registrada. Aguardando mais detalhes.";
    }

    return analysis;
};

module.exports = { analyzeMeal };