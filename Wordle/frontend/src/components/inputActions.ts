async function makeGuess(gameId: string, guess: string) {
  try {
    const response = await fetch(`/api/games/${gameId}/guesses`, {
      method: "post",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ guess: guess }),
    });

    if (!response.ok) {
      console.error(
        "Failed to post guess:",
        response.status,
        "\n",
        response.statusText
      );
    }

    const payload = await response.json();

    return payload;
  } catch (error) {
    console.error("Error making a guess:", error);
  }
}

async function getEvaluation(gameId: string, index: number) {
  try {
    const response = await fetch(`/api/games/${gameId}/evaluation`);

    if (!response.ok) {
      console.error(
        "Failed to retrieve data:",
        response.status,
        "\n",
        response.statusText
      );
    }

    const payload = await response.json();

    return payload.evaluation[index];
  } catch (error) {
    console.error("Error getting evaluation data:", error);
  }
}

async function handleSubmit(gameId: string, name: string) {
  const highscore = {
    name,
  };

  await fetch(`/api/games/${gameId}/highscores`, {
    method: "post",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(highscore),
  });
}

export { makeGuess, getEvaluation, handleSubmit };
