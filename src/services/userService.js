export const criarUsuario = async (usuario) => {
    const response = await fetch('http://localhost:3000/usuarios', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(usuario),
    });

    return response
}

export const recuperarUsuario = async (dadosLogin) => {
    const {email, senha} = dadosLogin
    const response = await fetch(`http://localhost:3000/usuarios?email=${email}&senha=${senha}`);

    const user = await response.json()
    if (user[0] !== undefined) {
        return user[0]
    }
}