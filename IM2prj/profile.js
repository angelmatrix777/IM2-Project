const profilePictureUpload = document.getElementById('profile-picture-upload');
const profilePicture = document.getElementById('profile-picture');
const uploadLabel = document.getElementById('upload-label');
const editPictureButton = document.getElementById('edit-picture');
const savePictureButton = document.getElementById('save-picture');
const profileInfo = document.getElementById('profile-info');
const editInfoButton = document.getElementById('edit-info');
const saveInfoButton = document.getElementById('save-info');
const addressInput = document.getElementById('profile-address');
const contactInput = document.getElementById('profile-contact');
const emailInput = document.getElementById('profile-email');

profilePictureUpload.addEventListener('change', (e) => {
  const file = profilePictureUpload.files[0];
  const reader = new FileReader();
  reader.onload = (event) => {
    profilePicture.src = event.target.result;
  };
  reader.readAsDataURL(file);
  uploadLabel.style.display = 'none';
  editPictureButton.style.display = 'inline-block';
  savePictureButton.style.display = 'inline-block';
});

editPictureButton.addEventListener('click', () => {
  profilePictureUpload.click();
});

savePictureButton.addEventListener('click', () => {
  uploadLabel.style.display = 'inline-block';
  editPictureButton.style.display = 'none';
  savePictureButton.style.display = 'none';
});

editInfoButton.addEventListener('click', () => {
  addressInput.readOnly = false;
  contactInput.readOnly = false;
  emailInput.readOnly = false;
  editInfoButton.style.display = 'none';
  saveInfoButton.style.display = 'inline-block';
});

saveInfoButton.addEventListener('click', () => {
  addressInput.readOnly = true;
  contactInput.readOnly = true;
  emailInput.readOnly = true;
  editInfoButton.style.display = 'inline-block';
  saveInfoButton.style.display = 'none';
});