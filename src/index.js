const serverURL = 'http://localhost:8280/creds';
const connectPeerURL = 'http://localhost:8280/api/lnd/connectpeer';
const listPeersURL = 'http://localhost:8280/api/lnd/listpeers';
const openChannelURL = 'http://localhost:8280/api/lnd/openchannel';
const addInvoiceURL = 'http://localhost:8280/api/lnd/addinvoice';

const sendPaymentURL = 'http://localhost:8280/api/lnd/sendpayment';

const pubkey_adv = '034ab0341fffb446ce5b4f28b142eb0557cfdeeb5cdcdc62f0a712b164f768fca5';

const pubkey_site = '025a5f0d9cdf970c8b65ec4a5869a5eb315d9a99aeca07e55139478350e5639ac7';

function timer() {
    document.getElementById("countdowntimer").style.display = "block";
    document.getElementById("md-ad").style.display = "block";
    document.getElementById("md-ad").style.zIndex = "12";
    var timeleft = 10;
    var downloadTimer = setInterval(function () {
        timeleft--;
        document.getElementById("countdowntimer").textContent = timeleft;
        if (timeleft <= 0) {
            clearInterval(downloadTimer);
            document.getElementById("md-ad").style.display = "none";
            document.getElementById("countdowntimer").style.display = "none";
            document.getElementById("header").innerHTML = "Congrats! Generate payment request with LND and provide me with it to get MONEY!";
            
        }
    }, 1000);
}

async function listPeers() {
    let response = await (await fetch(listPeersURL, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json'
        }
    }));

    await (response => {
        console.log('Success:', JSON.stringify(response));
    });

}

async function connectPeer(pubKey, hostName) {
    let response = await (await fetch(connectPeerURL, {
        method: 'POST',
        body: JSON.stringify({
            pubkey: pubKey,
            host: hostName,
        }), // data can be `string` or {object}!
        headers: {
            'Content-Type': 'application/json'
        }
    }));

    await (response => {
        console.log('Success:', JSON.stringify(response));
    });

}

async function openChannel(pubKey) {
    let response = await (await fetch(openChannelURL, {
        method: 'POST',
        body: JSON.stringify({
            pubkey: '0319ac08cd3902982d708ee374b673234a6a1c0842ffd7e9019db358815cf3f2d6',
            localamt: 50000,
            pushamt: 5000
        }), // data can be `string` or {object}!
        headers: {
            'Content-Type': 'application/json'
        }
    }));

    await (response => {
        console.log('Success:', JSON.stringify(response));
    });

}

async function addInvoice(pubKey) {
    let response = await (await fetch(addInvoiceURL, {
        method: 'POST',
        body: JSON.stringify({
            pubkey: pubKey,
            value: 1700,
        }), // data can be `string` or {object}!
        headers: {
            'Content-Type': 'application/json'
        }
    }));

    await (response => {
        console.log('Success:', JSON.stringify(response));
    });

}

async function sendPayment(peyreq) {
    let response = await (await fetch(sendPaymentURL, {
        method: 'POST',
        body: JSON.stringify({
            payreq: peyreq
        }), // data can be `string` or {object}!
        headers: {
            'Content-Type': 'application/json'
        }
    }));

    await (response => {
        console.log('Success:', JSON.stringify(response));
    });

}




// Access the form element...


// ...and take over its submit event.
let flow;

document.getElementById("userButton").onclick = function (e) {
    document.getElementById('startButtons').style.display = "none";
    document.getElementById('mainContainerUsr').style.display = "flex";
    document.getElementById('mainHeader').innerHTML = "To start viewing Ads please, provide your node credentials:";
    flow = "user";
};

document.getElementById("advButton").onclick = function (e) {
    document.getElementById('startButtons').style.display = "none";
    document.getElementById('mainContainerAdv').style.display = "flex";
    document.getElementById('mainHeader').innerHTML = "To start viewing Ads please, provide your node credentials:";
    flow = "advertiser";
};

const form = document.getElementById("myForm");
if (flow == 'user') {
    form.addEventListener("submit", async function (event) {
        event.preventDefault();
        console.log("BEFORE");
        const pubkeyUsr = document.getElementById("pubKeyUsr").value;
        const hostNameUsr = document.getElementById("hostNameUsr").value;

        console.log(pubkeyUsr, hostNameUsr);
        connectPeer(pubkeyUsr, hostNameUsr)
            .then((resp) => {
                console.log('Connect peer resp', resp);
                fetch(listPeersURL)
                    .then(resp => {
                        console.log('listPeersURL resp', resp);

                        timer();

                        if (resp) {
                            document.getElementById('myFormUsr').style.display = "none";
                            document.getElementById('myFormUsr').innerHTML = "";
                            document.getElementById('contentUsr').innerHTML = "success, connected & loaded peers";
                            openChannel(pubkeyUsr)
                                .then(resp => {
                                    console.log('Open channel resp', resp);
                                    document.getElementById('contentUsr').innerHTML = "success, opened channel";
                                    document.getElementById('contentUsr').innerHTML = "Please, create a payment request here: ";

                                    document.getElementById('myForm2').style.display = "block";

                                            console.log('sendPayment resp', resp);
                                            document.getElementById("header").innerHTML = "Success! Money is yours, check the wallet!"
                                        })
                                        .catch((e) => {
                                            console.error(e);
                                        });
                                });
                            })
                            .catch((e) => {
                                console.error(e);
                                try {
                                    document.getElementById('content').innerHTML = "success, opened channel";
                                    document.getElementById('content').innerHTML = "Please, create a payment request here: ";
                                    document.getElementById('myForm').style.display = "none";
                                    document.getElementById('myForm2').style.display = "flex";
                                    const paymentRequest = document.getElementById("send-payment");

                                    paymentRequest.addEventListener("click", async function (event) {
                                        event.preventDefault();
                                        const peyreq = document.getElementById("payreq").value;

                                        sendPayment(peyreq)
                                            .then(resp => {

                                                console.log('sendPayment resp', resp);
                                            })
                                            .catch((e) => {
                                                console.error(e);
                                            });
                                    });
                                })
                                .catch((e) => {
                                    console.error(e);
                                    try {
                                        document.getElementById('contentUsr').innerHTML = "success, opened channel";
                                        document.getElementById('contentUsr').innerHTML = "Please, create a payment request here: ";
                                        document.getElementById('myFormUsr').style.display = "none";
                                        document.getElementById('myForm2').style.display = "flex";
                                        const paymentRequest = document.getElementById("send-payment");

                                        paymentRequest.addEventListener("submit", async function (event) {
                                            event.preventDefault();
                                            const peyreq = document.getElementById("payreq").value;

                                            sendPayment(peyreq)

                                                .then(resp => {

                                                    console.log('sendPayment resp', resp);
                                                })
                                                .catch((e) => {
                                                    console.error(e);
                                                });
                                        });


                                    } catch (e) {
                                        console.error(e);
                                    }
                                });

                        }
                    })
                    .catch((e) => {
                        console.error(e);
                    });
                ;
            })
            .catch((e) => {
                console.error(e);
            });
        // console.log(respPeers);
    });
} else {

     form.addEventListener("submit", async function (event) {
        event.preventDefault();
        console.log("BEFORE");
        const pubkeyAdv = document.getElementById("pubKeyAdv").value;
        const hostNameAdv = document.getElementById("hostNameAdv").value;

        console.log(pubkeyAdv, hostNameAdv);
        connectPeer(pubkeyAdv, hostNameAdv)
            .then((resp) => {
                console.log('Connect peer resp', resp);
                fetch(listPeersURL)
                    .then(resp => {
                        console.log('listPeersURL resp', resp);



                        if (resp) {
                            // document.getElementById('myFormAdv').style.display = "none";
                            // document.getElementById('myFormAdv').innerHTML = "";
                            // document.getElementById('contentAdv').innerHTML = "success, connected & loaded peers";
                            openChannel(pubkeyAdv)
                                .then(resp => {
                                    console.log('Open channel resp', resp);
                                    // document.getElementById('contentAdv').innerHTML = "success, opened channel";
                                    // document.getElementById('contentAdv').innerHTML = "Please, create a payment request here: ";
                                    //
                                    // document.getElementById('myForm2').style.display = "block";




                                    event.preventDefault();


                                    addInvoice(pubkey_site)
                                        .then(resp => {
                                            console.log('add invoice resp', resp);
                                            sendPayment(resp['payment_request'])
                                            .then (resp => {
                                                console.log('sendPayment resp', resp)
                                                closeChannel();
                                            })

                                        })
                                        .catch((e) => {
                                            console.error(e);
                                        });

                                })
                                .catch((e) => {
                                    console.error(e);
                                    try {
                                        document.getElementById('contentAdv').innerHTML = "success, opened channel";
                                        document.getElementById('contentAdv').innerHTML = "Please, create a payment request here: ";
                                        document.getElementById('myFormAdv').style.display = "none";
                                        document.getElementById('myForm2').style.display = "flex";
                                        const paymentRequest = document.getElementById("send-payment");

                                        paymentRequest.addEventListener("submit", async function (event) {
                                            event.preventDefault();
                                            const peyreq = document.getElementById("payreq").value;

                                            sendPayment(peyreq)

                                                .then(resp => {

                                                    console.log('sendPayment resp', resp);
                                                })
                                                .catch((e) => {
                                                    console.error(e);
                                                });
                                        });


                                    } catch (e) {
                                        console.error(e);
                                    }
                                });

                        }
                    })
                    .catch((e) => {
                        console.error(e);
                    });
                ;
            })
            .catch((e) => {
                console.error(e);
            });
        // console.log(respPeers);
    });


}