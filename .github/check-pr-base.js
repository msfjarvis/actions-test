module.exports = async ({github, context}) => {
    octokit.rest.issues.createComment({
      owner: context.payload.repository.owner.login,
      repo: context.payload.repository.name,
      issue_number: context.payload.number,
      body: `This PR is targeting the 'main' branch but did not originate from 'staging', please make sure this intentional`,
    });
}
