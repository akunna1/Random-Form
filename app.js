// Grab canvas
const adultCanvas = document.getElementById('adultSignature');

// Set canvas width dynamically to match container
adultCanvas.width = adultCanvas.offsetWidth;
adultCanvas.height = 150;

// Initialize SignaturePad with smoothing for trackpad
const adultSignaturePad = new SignaturePad(adultCanvas, {
  minWidth: 1,
  maxWidth: 3,
  penColor: "black",
  backgroundColor: "rgba(255,255,255,0)", // transparent
  velocityFilterWeight: 0.7
});

// Clear button
document.getElementById('clearAdultSignature').addEventListener('click', () => adultSignaturePad.clear());

// Form submission
document.getElementById('myForm').addEventListener('submit', function(e){
  e.preventDefault();

  // Validate canvas signature
  if(adultSignaturePad.isEmpty()){
    alert("Please provide the adult/guardian signature.");
    adultCanvas.focus();
    return;
  }

  // Validate date
  const signatureDate = document.getElementById('signatureDate').value;
  if(!signatureDate){
    alert("Please select the signature date.");
    document.getElementById('signatureDate').focus();
    return;
  }

  // Base64 image
  const adultSignatureData = adultSignaturePad.toDataURL();

  const formData = {
    // Participant info
    name: document.getElementById('name').value,
    dob: document.getElementById('dob').value,
    street: document.getElementById('street').value,
    cityState: document.getElementById('citystate').value,
    zip: document.getElementById('zip').value,
    dlNumber: document.getElementById('dlNumber').value,
    dlState: document.getElementById('dlState').value,
    emergencyName: document.getElementById('emergencyName').value,
    emergencyPhone: document.getElementById('emergencyPhone').value,
    participantSignature: document.getElementById('participantSignature').value, // text input

    // Adult signature
    adultSignature: adultSignatureData, // canvas image
    signatureDate: signatureDate,

    // Departmental use inputs
    units: document.getElementById('units').value,
    captain: document.getElementById('captain').value,
    battalionChief: document.getElementById('battalionChief').value,
    divisionChief: document.getElementById('divisionChief').value,
    dateTimeStart: document.getElementById('dateTimeStart').value,
    dateTimeEnd: document.getElementById('dateTimeEnd').value
  };

  fetch("HTTP_URL", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(formData)
  })
  .then(res => {
    if(res.ok) alert("Form submitted!");
    else alert("Submission failed.");
  })
  .catch(err => console.error(err));
});