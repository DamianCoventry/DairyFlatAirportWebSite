function updateSignInGui() {
    setSignInButtonText();
    const api = new BookingAPI();
    if (api.isSignedIn()) {
        signUpButton.style.display = 'none';
        signInButton.style.display = 'none';
        userDropDownDiv.style.display = '';

        signedInUserDisplayName.innerText = api.signedInUserDisplayName;
        signedInUserSpan.style.display = '';
        api.getSignedInUser(
            function (json) {
                signedInUserDisplayName.innerText = api.signedInUserDisplayName;
                signedInUserSpan.style.display = '';
            },
            showHttpError
        );
    }
    else {
        signInButton.style.display = '';
        userDropDownDiv.style.display = 'none';

        signedInUserDisplayName.innerText = '';
        signedInUserSpan.style.display = 'none';
    }
}

function signUp() {
    window.location.href = BACKEND_ADDRESS + 'sign-up/';
}

function signIn() {
    const api = new BookingAPI();
    if (!api.isSignedIn()) {
        api.signIn(window.location.href);
    }
    setSignInButtonText();
}

function signOut() {
    const api = new BookingAPI();
    if (api.isSignedIn()) {
        api.signOut();
        signedInUserSpan.style.display = 'none';
    }
    setSignInButtonText();
}

function editUserAccount() {
    const element = document.getElementById("editUserAccountModal");
    element.addEventListener('shown.bs.modal', event => {
        saveUserAccountButton.disabled = true;
        editUserAccountSpinner.style.display = "";
        userAccountForm.style.display = 'none';
        editUserAccountTitle.innerText = 'Edit User Account';

        const api = new BookingAPI();
        api.getSignedInUser(function (json) {
                saveUserAccountButton.disabled = false;
                editUserAccountSpinner.style.display = 'none';
                userAccountForm.style.display = '';

                userName.value = json.username;
                emailAddress.value = json.email;
                firstName.value = json.first_name;
                lastName.value = json.last_name;
            },
            showHttpError);
    });

    if (!editUserAccountModal) {
        editUserAccountModal = new bootstrap.Modal('#editUserAccountModal');
    }
    editUserAccountModal.show();
}

function saveUserAccountButtonClicked() {
    const forms = document.querySelectorAll('.needs-validation');
    Array.from(forms).forEach(form => {
        if (form.checkValidity()) {
            formFieldset.disabled = true;
            saveUserAccountButton.disabled = true;
            saveSpinner.style.display = "";
            saveUserAccount();
        }
        else {
            event.preventDefault();
            event.stopPropagation();
            form.classList.add('was-validated');
        }
    });
}

function saveUserAccount() {
    const api = new BookingAPI();
    setTimeout(function () {
        api.modifyUser(
            api.signedInUserId,
            userName.value,
            emailAddress.value,
            firstName.value,
            lastName.value,
            function(json) {
                if (editUserAccountModal) {
                    editUserAccountModal.hide();
                }
                saveUserAccountButton.disabled = false;
                formFieldset.disabled = false;
                saveSpinner.style.display = "none";
                updateSignInGui();
            },
            function(code, json) {
                saveUserAccountButton.disabled = false;
                formFieldset.disabled = false;
                saveSpinner.style.display = "none";
                showHttpError(code, json);
            });
        }, 500);
}

function changePassword() {
    window.location.href = BACKEND_ADDRESS + 'password-change/';
}

function confirmDeleteUserAccount() {
    const modalDialog = new bootstrap.Modal('#finalConfirmation');
    modalDialog.show();
}

function deleteUserAccount() {
    deleteButton.disabled = true;
    const api = new BookingAPI();
    api.deleteSignedInUser(showHttpError); // This will also sign out the current user
}

function setSignInButtonText() {
    const api = new BookingAPI();
    if (api.isSignedIn()) {
        signInButton.setAttribute('class', 'btn btn-success');
        signInButton.innerText = 'Sign Out';
    }
    else {
        signInButton.setAttribute('class', 'btn btn-primary');
        signInButton.innerText = 'Sign In';
        signedInUserDisplayName.innerText = '';
    }
}

function signedInGuard() {
    const api = new BookingAPI();
    if (!api.isSignedIn()) {
        api.signIn(window.location.href);
    }
}
