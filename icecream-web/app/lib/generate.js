import { build, perBuild } from '@jackfranklin/test-data-bot';
import { faker } from '@faker-js/faker';

const buildUser = build('User', {
  fields: {
    email: perBuild(() => faker.internet.email()),
    password: perBuild(() => generateValidPassword()),
  },
  postBuild: (user) => ({
    ...user,
    repeatPassword: user.password, 
  }),
});

function generateValidPassword() {
  const letters = faker.string.alpha(5); // At least 1 letter
  const numbers = faker.string.numeric(2); // At least 1 number
  const specialChars = '!@#$%^&*'; // Special character pool
  const special = faker.helpers.arrayElement(specialChars); // Get one random special character
  const passwordArray = [...letters, ...numbers, special];
  const shuffledPassword = faker.helpers.shuffle(passwordArray).join('');

  return shuffledPassword.length >= 8 ? shuffledPassword : shuffledPassword + 'A1!'; // Ensure minimum length
}

export { buildUser };
