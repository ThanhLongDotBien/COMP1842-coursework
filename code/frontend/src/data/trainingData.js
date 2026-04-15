/**
 * 10 hardcoded training scenarios.
 * Each has a Title, Content, and correctCategory.
 * The quiz fetches real entries from the DB and picks:
 *   - correct answer  = a random entry matching correctCategory
 *   - distractors     = random entries from OTHER categories
 * This trains staff to match a customer scenario to the right entry.
 */
const TRAINING_SCENARIOS = [
  {
    id: 1,
    category: 'Login',
    title: 'Cannot log in after registration',
    content: 'I just created my account but when I try to log in it says my credentials are invalid. I am sure I typed the password correctly during registration.'
  },
  {
    id: 2,
    category: 'Login',
    title: 'Forgot password — locked out',
    content: 'I have not used the system in a while and cannot remember my password. I tried several times and now I cannot get in at all. Please help.'
  },
  {
    id: 3,
    category: 'Registration',
    title: 'Email already in use error',
    content: 'I am trying to sign up but the system says my email address is already registered. I have never made an account here before.'
  },
  {
    id: 4,
    category: 'Registration',
    title: 'Did not receive verification email',
    content: 'I registered successfully but never received the verification email. I checked my spam folder and it is not there either. My account is still unverified.'
  },
  {
    id: 5,
    category: 'Technical',
    title: 'Page not loading correctly',
    content: 'Some parts of the page are not displaying properly. Buttons are missing and the layout looks broken. I am using the latest version of Chrome.'
  },
  {
    id: 6,
    category: 'Technical',
    title: 'Error 500 when submitting form',
    content: 'Every time I try to submit the support form I get a "500 Internal Server Error" message. I have tried multiple times on different days with the same result.'
  },
  {
    id: 7,
    category: 'Billing',
    title: 'Charged twice this month',
    content: 'My bank statement shows two charges from your service this month but I only have one subscription. I need a refund for the duplicate charge.'
  },
  {
    id: 8,
    category: 'Account',
    title: 'Cannot update profile information',
    content: 'I am trying to change my email address in my profile settings but every time I click Save nothing happens. The old email is still showing.'
  },
  {
    id: 9,
    category: 'Network',
    title: 'Connection keeps timing out',
    content: 'The application keeps showing a "Connection timed out" error. My internet connection is fine and other websites load without any problem.'
  },
  {
    id: 10,
    category: 'Other',
    title: 'Data entered yesterday has disappeared',
    content: 'I spent a long time filling in my details yesterday and saved everything. Today when I logged back in all the information is gone. Nothing is there anymore.'
  }
]

export default TRAINING_SCENARIOS
