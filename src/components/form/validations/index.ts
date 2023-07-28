const passwordRegex = /^(?=.*[A-Z])(?=.*[a-z])(?=.*\d).{8,100}$/

const emailRegex =
  /^(([^\s"(),.:;<>@[\\\]]+(\.[^\s"(),.:;<>@[\\\]]+)*)|(".+"))@((\[(?:\d{1,3}\.){3}\d{1,3}])|(([\dA-Za-z-]+\.)+[A-Za-z]{2,}))$/

const nameRegex = /^([A-Za-z]){1,20}$/

export const isRequired = (required: boolean = false) =>
  required && 'This field is required'

export const email = {
  pattern: {
    value: emailRegex,
    message: 'please enter valid email address',
  },
}

export const name = {
  pattern: {
    value: nameRegex,
    message: 'Last name must contain only letters',
  },
}

export const password = {
  pattern: {
    value: passwordRegex,
    message:
      'Required at least: 8 characters, a digit, and an uppercase letter.',
  },
}