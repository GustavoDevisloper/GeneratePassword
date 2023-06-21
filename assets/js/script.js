document.addEventListener("DOMContentLoaded", function() {
  var imagem = document.getElementById("tema");
  var pasteIcon = document.getElementById("paste");
  var copyIcon = document.querySelector(".hash img[alt='']");
  var temaBranco = false;
  var contentElement = document.querySelector(".content");
  var border3 = document.querySelector(".border3");
  var border4 = document.querySelector(".border4");
  var border5 = document.querySelector(".border5");
  var border6 = document.querySelector(".border6");
  var border7 = document.querySelector(".border7");
  var numberInput = document.getElementById("inputNumber");
  var passDiv = document.querySelector('.pass');
  passDiv.classList.add('theme-white');
  var generateButton = document.getElementById("gen");
  generateButton.addEventListener("click", generatePasswords);

  numberInput.addEventListener("change", generatePasswords);

  imagem.addEventListener("click", function() {
    if (temaBranco) {
      imagem.src = "./assets/imgs/Icon.png";
      contentElement.classList.remove("white-theme");
      pasteIcon.src = "./assets/imgs/paste.png";
      border3.classList.remove("white-border");
      border4.classList.remove("white-border");
      border5.classList.remove("white-border");
    } else {
      imagem.src = "./assets/imgs/themeBranco.png";
      contentElement.classList.add("white-theme");
      pasteIcon.src = "./assets/imgs/whitePaste.png";
      border3.classList.add("white-border");
      border4.classList.add("white-border");
      border5.classList.add("white-border");
    }

    temaBranco = !temaBranco;

    if (temaBranco) {
      document.body.classList.add("white-theme");
    } else {
      document.body.classList.remove("white-theme");
    }
  });

  border4.addEventListener("click", function() {
    border4.classList.toggle("active");
    border3.classList.remove("active");
    border5.classList.remove("active");
    document.querySelector('.hash h3').textContent = "SHA-1 Gerado";
    generatePasswords();
  });

  border3.addEventListener("click", function() {
    border3.classList.toggle("active");
    border4.classList.remove("active");
    border5.classList.remove("active");
    document.querySelector('.hash h3').textContent = "MD5 Gerado";
    generatePasswords();
  });

  border5.addEventListener("click", function() {
    border5.classList.toggle("active");
    border3.classList.remove("active");
    border4.classList.remove("active");
    document.querySelector('.hash h3').textContent = "bcrypt Gerado";
    generatePasswords();
  });

  border6.addEventListener("click", function(event) {
    event.stopPropagation();
    border6.classList.toggle("active");
    border6.querySelector("h5").classList.toggle("inactive");

    generatePasswords();
  });

  border7.addEventListener("click", function(event) {
    event.stopPropagation();
    border7.classList.toggle("active");
    border7.querySelector("h5").classList.toggle("inactive");

    generatePasswords();
  });

  copyIcon.addEventListener("click", function() {
    var md5SenhaGeradaElement = document.getElementById("md5SenhaGerada");
    var sha1SenhaGeradaElement = document.getElementById("sha1SenhaGerada");

    var passwords = [];

    if (border3.classList.contains("active")) {
      passwords.push(md5SenhaGeradaElement.textContent);
    }

    if (border4.classList.contains("active")) {
      passwords.push(sha1SenhaGeradaElement.textContent);
    }

    var tempTextArea = document.createElement("textarea");
    tempTextArea.value = passwords.join("\n");
    document.body.appendChild(tempTextArea);
    tempTextArea.select();
    document.execCommand("copy");
    document.body.removeChild(tempTextArea);
  });

  function generatePasswords() {
    var allowUppercase = border6.classList.contains("active");
    var allowLowercase = border7.classList.contains("active");
    var allowNumbers = !(border6.classList.contains("active") || border7.classList.contains("active"));
    var passwordLength = parseInt(numberInput.value);
    var password = generateRandomPassword(passwordLength, allowUppercase, allowLowercase, allowNumbers);
    var senhaGeradaElement = document.getElementById("senhaGerada");
    senhaGeradaElement.textContent = password;

    if (border3.classList.contains("active")) {
      generateMD5Password(password);
    } else {
      clearMD5Password();
    }

    if (border4.classList.contains("active")) {
      generateSHA1Password(password);
    } else {
      clearSHA1Password();
    }
  }

  function generateRandomPassword(length, allowUppercase, allowLowercase, allowNumbers) {
    var characters = "";
    if (allowUppercase) {
      characters += "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
    }
    if (allowLowercase) {
      characters += "abcdefghijklmnopqrstuvwxyz";
    }
    if (allowNumbers) {
      characters += "0123456789";
    }
    var password = "";
    for (var i = 0; i < length; i++) {
      var randomIndex = Math.floor(Math.random() * characters.length);
      password += characters.charAt(randomIndex);
    }
    return password;
  }

  function generateMD5Password(password) {
    var md5Hash = CryptoJS.MD5(password).toString();
    var md5SenhaGeradaElement = document.getElementById("md5SenhaGerada");
    md5SenhaGeradaElement.textContent = md5Hash;
  }

  function clearMD5Password() {
    var md5SenhaGeradaElement = document.getElementById("md5SenhaGerada");
    md5SenhaGeradaElement.textContent = "";
  }

  function generateSHA1Password(password) {
    var sha1Hash = CryptoJS.SHA1(password).toString();
    var sha1SenhaGeradaElement = document.getElementById("sha1SenhaGerada");
    sha1SenhaGeradaElement.textContent = sha1Hash;
  }

  function clearSHA1Password() {
    var sha1SenhaGeradaElement = document.getElementById("sha1SenhaGerada");
    sha1SenhaGeradaElement.textContent = "";
  }
});
