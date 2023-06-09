const cookieName = 'my-token';

export default function handler(req, res) {
  console.log('Debug log for deploymentIdentifier: test-deployment-identifier');
  console.log({cookie: req.headers.cookie});
  console.log({cookies: req.cookies});
  console.log(JSON.stringify(req.headers));
  console.log(JSON.stringify(req));

  if (process.env.TEST_VARIABLE !== 'TEST_VALUE') {
    throw new Error('Env variable not present');
  }

  if (!req.headers.cookie.contains(cookieName)) {
    throw new Error('Cookie not present');
  }

  res
    .status(200)
    .setHeader(
      'set-cookie',
      'my-cookie=heres-my-cookie; Path=/; HttpOnly; Secure; SameSite=Lax'
    )
    .setHeader(
      'set-cookie',
      'my-cookie-2=heres-my-cookie-2; Path=/; HttpOnly; Secure; SameSite=Lax'
    )
    .json({ deploymentIdentifier: 'DEPLOYMENT_IDENTIFIER' })
}
