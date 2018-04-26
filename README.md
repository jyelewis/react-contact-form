# React contact form

## Testing
### To start visual test
```
yarn && yarn start
```
Navigate to localhost:3000 in a browser

### To run unit tests
```
yarn && yarn test
```

## Using this form within other projects
Within this project: ```yarn link```
Within your project: ```yarn link react-contact-form```

```
import { ContactDetailsForm } from 'react-contact-form'

<ContactDetailsForm
    contactDetails={}
    onChange={}
    onSubmit={}
/>

```
