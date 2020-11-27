const cred = require('../credentials.json');
const ftpDeploy = require('ftp-deploy');
const ftp = new ftpDeploy();

const config = {
	user: cred.user,
	password: cred.pass,
	host: cred.host,
	port: cred.port,
	localRoot: './build',
	remoteRoot: cred.root,
	include: ['.*', '*', 'build/*'],
	deleteRemote: true,
	forcePasv: true,
};

ftp.deploy(config)
	.then(res => console.log('Deployed: ', res.flat()))
	.catch(err => console.error('Deploy Failed: ', err));
