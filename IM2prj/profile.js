document.addEventListener('DOMContentLoaded', () => {
  fetch('get_employee_data.php')
    .then(response => response.json())
    .then(data => {
      if (data.loggedin) {
        if (!data.isAdmin) {
          const adminDiv = document.querySelector('.buttons');
          if (adminDiv) {
            adminDiv.style.display = "none";
          }
        }

        // Populate profile data
        if (data.employeeData) {
          document.getElementById('profile-id').textContent = data.employeeData.id;
          document.getElementById('profile-role').textContent = data.employeeData.permission;
          document.getElementById('profile-name').value = data.employeeData.first_name + ' ' + data.employeeData.last_name;
          document.getElementById('profile-contact').value = data.employeeData.contact_number;
          document.getElementById('profile-email').value = data.employeeData.email;
        }
      } else {
        alert("You are not logged in");
        window.location.href = 'index.html'; // Redirect to login page if not logged in
      }
    })
    .catch(error => console.error('Error fetching session info:', error));
});

const profilePictureUpload = document.getElementById('profile-picture-upload');
const profilePicture = document.getElementById('profile-picture');
const uploadLabel = document.getElementById('upload-label');
const editPictureButton = document.getElementById('edit-picture');
const savePictureButton = document.getElementById('save-picture');
const editInfoButton = document.getElementById('edit-info');
const saveInfoButton = document.getElementById('save-info');
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

document.addEventListener('DOMContentLoaded', () => {
  fetch('get_employee_profile.php')
      .then(response => response.json())
      .then(data => {
          if (data.success) {
              const employee = data.employee;
              document.getElementById('employeeName').textContent = `${capitalize(employee.first_name)} ${capitalize(employee.last_name)}`;
              document.getElementById('employeeRole').textContent = employee.department;
              document.getElementById('employeeContactNumber').textContent = employee.contact_number;
              document.getElementById('employeeEmail').textContent = employee.email;
          } else {
              console.error('Failed to fetch employee data');
          }
      })
      .catch(error => console.error('Error:', error));
});

function capitalize(str) {
  return str.charAt(0).toUpperCase() + str.slice(1);
}
document.addEventListener('DOMContentLoaded', () => {
    fetch('get_employee_profile.php')
        .then(response => response.json())
        .then(data => {
            if (data.success) {
                const employee = data.employee;
                document.getElementById('employeeName').textContent = `${capitalize(employee.first_name)} ${capitalize(employee.last_name)}`;
                document.getElementById('employeeRole').textContent = employee.department;
                document.getElementById('employeeContactNumber').textContent = employee.contact_number;
                document.getElementById('employeeEmail').textContent = employee.email;
            } else {
                console.error('Failed to fetch employee data');
            }
        })
        .catch(error => console.error('Error:', error));
});

function capitalize(str) {
    return str.charAt(0).toUpperCase() + str.slice(1);
}


document.getElementById('logoutBtn').addEventListener('click', function () {
  window.location.href = 'index.html';
});