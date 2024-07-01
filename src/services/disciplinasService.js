export const criarDisciplina = async (disciplina) => {
    const response = await fetch('http://localhost:3000/disciplinas', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(disciplina),
    });

    return response
}

export const recuperarDisciplinas = async () => {
    const response = await fetch('http://localhost:3000/disciplinas');

    const disciplinas = await response.json()
    return disciplinas
}