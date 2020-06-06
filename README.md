# Rescuing Leftover Cuisine Mobile App

_Last Updated 06/05/2020_

## Guide

If this is your first time cloning our repo, read our [documentation](https://www.notion.so/Rescuing-Leftover-Cuisine-bcf225f933404ec6b06eb7ea8719fb5d).

## Setup

### Expo Quickstart

1. Clone the repo.
2. If you don't have expo installed globally, run `npm i -g expo`.
3. Run `expo install`.
4. Create a file called `.env` in the root directory. Your `.env` file should have the following contents: 

```
BASE_URL={YOUR LOCAL SERVER URL}
SENTRY_ORG='calblueprint'
SENTRY_PROJECT='rlc-mobile'
SENTRY_AUTH_TOKEN={SECURE SENTRY TOKEN}
```

To retrieve the sentry token, refer to the [Notion Documentation](https://www.notion.so/Rescuing-Leftover-Cuisine-bcf225f933404ec6b06eb7ea8719fb5d)

5. Run `expo start` to test the app using your local RLC server.

### Rails Quickstart

An example of how to run the RLC website on your local computer. 

1. Clone the RLC website repo. 
2. Run the following
```
rails runner db/seed_data/create_dashboard_notifications.rb
rails runner db/seed_data/seed_data_for_pay_periods.rb
rake db:seed
rails server -b 0
```
You should be able to create an account with your dev URL (i.e. `localhost:3000`). 


### Linter and Prettier

- [Install vscode extension for eslint and prettier](https://dev.to/robertcoopercode/using-eslint-and-prettier-in-a-typescript-project-53jb)


## Updating the app

You can perform an [OTA updates](https://docs.expo.io/versions/latest/guides/configuring-ota-updates/) via `expo publish --release-channel prod`

Not all updates can be submitted via OTA. You can read more about the limitations [here](https://docs.expo.io/workflow/publishing/#limitations).

If you do need to submit a new build to the app store, you will need to perform the following steps.

- Go to `app.json` and make sure to modify/increment `expo.version`, `expo.android.versionCode`, `expo.ios.buildNumber`. These are used to keep track of the app versions submitted to the stores. If a build with the same versionCode or buildNumber exists already, the app store will reject your submission.


## Production Accounts

| Service           | Purpose                                                    |
| ----------------- | ---------------------------------------------------------- |
| Heroku            | Monitors site traffic                                      |
| Expo              | Expo account for OTA updates                               |
| Android Playstore | Android Google Play store account                          |
| Apple App store   | iOS App store account                                      |




