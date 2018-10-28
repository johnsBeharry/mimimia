const EthCrypto = window.EthCrypto;
const ipfs = new window.Ipfs({host: 'ipfs.infura.io', port: 5001, protocol: 'https'})
const reader = new FileReader();

// dom elements
const form = document.querySelector("form#create-listing");
const photoField = document.querySelector("input[type=file]");

// event listeners
form.addEventListener("submit", submit, true);
photoField.addEventListener("change", processImage);

// FOR TESTING
const alice = EthCrypto.createIdentity();
const bob = EthCrypto.createIdentity();


/*
	Encrypt data given an address
	@param {string} _address
	@param {string} _data
	@return Promise
 */
function encrypt(_address, _data) {
	return new Promise((_resolve, _reject) => {
		EthCrypto.encryptWithPublicKey(
			_address,
			JSON.stringify(_data)
			)
			.then((_encrypted) => {
				_resolve(_encrypted);
			})
			.catch((_error) => {
				_reject(_error);
			});
	});
}

/*
	Decrypt data using a private key
	@param {string} _privateKey
	@param {string} _encryptedData
	@return Promise
 */
function decrypt(_privateKey, _encryptedData) {
	return new Promise((_resolve, _reject) => {
		EthCrypto.decryptWithPrivateKey(
			_privateKey,
			_encryptedData
			)
			.then((_decrypted) => {
				_resolve(stripEndQuotes(_decrypted));
			})
			.catch((_error) => {
				_reject(_error);
			});
	});
}

/*
	Update the preview image dom element with a new source
	@param {string} _src
	@param {string} _el - selector of dom element
	@return nothing

	@TODO add some eye candy
		1. pixalte image preview https://codepen.io/crosslab/pen/ZLJxRj
		2. have switch to unpixilate photo but this disables the submit button
 */
function updateImgSrc(_src, _selector="img#preview") {
	let preview = document.querySelector(_selector);
	preview.src = _src;
}


/*
	Check and strip starting and end quotes from a string
	@param {string} _src
	@return {string}
 */
function stripEndQuotes(s){
	var t=s.length;
	if (s.charAt(0)=='"') s=s.substring(1,t--);
	if (s.charAt(--t)=='"') s=s.substring(0,t);
	return s;
}

/*
	Process selected file in field
	@param {string} _src
	@return {string}
 */
function processImage() {
	var file = document.querySelector("input[type=file]").files[0];

	// listen for changes to file reader
	reader.addEventListener("load", function () {
		updateImgSrc(reader.result, 'img#preview');
	}, false);

	if(file) {
		reader.readAsDataURL(file);
	}
}

function submit(_event) {
	_event.preventDefault();

	// gater submission meta data
	const formData = {
		title: document.querySelector("input#title").value,
		price: document.querySelector("input#price").value,
		desc: document.querySelector("textarea").value,
	};

	console.log(formData);
	// ...


}

/*
	Add file to IPFS and so it can never go away
	@param {string} _data
	@return {string}
 */
function storeItForever(_data){
	ipfs.files.add(_data, (_err, _result) => {
		if(_err) {
			console.error(err);
			return _err;
		}

		let url = `https://ipfs.io/ipfs/${_result[0].hash}`;

		console.log(`Url --> ${url}`)
		return url;
	})
}
