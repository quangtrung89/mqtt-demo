let settings = {
   mqqtOptions : {
    port: 1883,
    auth: false,
    keepalive: 45,
    tls: false,
    selfSignedCertificates: false,
    host: '192.168.1.170', //change to your IP address
    clientId: 'test'
  },
  boxTopic : 'user/device/00000000-0000-0000-0000-000000000007'
};

export default settings;
