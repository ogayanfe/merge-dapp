export const parseGithubUrl = (_url: string) => {
  const url = _url.toLowerCase();
  try {
    const match = url.match(/github\.com\/([^/]+)\/([^/]+)(\/pull\/(\d+))?/);
    if (!match) return null;
    return {
      owner: match[1],
      repo: match[2],
      number: match[4],
      fullRepo: `${match[1]}/${match[2]}`,
    };
  } catch (e) {
    console.log(e);
    return null;
  }
};

export const validatePrAgainstRepo = (prUrl: string, repoUrl: string) => {
  const pr = parseGithubUrl(prUrl.toLowerCase());
  const repo = parseGithubUrl(repoUrl.toLowerCase());

  if (!pr || !repo) return false;

  return pr.owner.toLowerCase() === repo.owner.toLowerCase() && pr.repo.toLowerCase() === repo.repo.toLowerCase();
};
