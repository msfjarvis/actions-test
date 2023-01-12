module.exports = async ({github, context}) => {
  const pr = await github.rest.pulls.get({
    owner: context.payload.repository.owner.login,
    repo: context.payload.repository.name,
    pull_number: context.payload.number,
  });

  const shouldWarn = pr.head.ref != "staging" // && pr.base.ref == "main"

  if (shouldWarn) {
    octokit.rest.issues.createComment({
      owner: context.payload.repository.owner.login,
      repo: context.payload.repository.name,
      issue_number: context.payload.number,
      body: `This PR is targeting the 'main' branch but did not originate from 'staging', please make sure this intentional`,
    });
  }

  return shouldWarn
}
