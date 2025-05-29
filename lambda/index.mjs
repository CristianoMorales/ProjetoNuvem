export const handler = async () => {
  try {
    const response = await fetch('http://3.210.124.30:3000/games');
    const data = await response.json();

    return {
      statusCode: 200,
      body: JSON.stringify({
        totalGames: data.length,
        lastUpdated: new Date().toISOString()
      }),
    };
  } catch (error) {
    return {
      statusCode: 500,
      body: JSON.stringify({
        message: 'Erro ao buscar dados da API',
        error: error.message,
      }),
    };
  }
};
