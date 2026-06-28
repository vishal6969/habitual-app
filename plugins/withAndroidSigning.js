const { withAppBuildGradle } = require("@expo/config-plugins");

const LOAD_KEYSTORE_PROPS = `
def keystorePropsFile = rootProject.file("../keystore.properties")
def keystoreProps = new Properties()
if (keystorePropsFile.exists()) {
    keystoreProps.load(new FileInputStream(keystorePropsFile))
}
`;

const RELEASE_SIGNING_CONFIG = `        release {
            storeFile file("../../" + keystoreProps['HABITUAL_STORE_FILE'])
            storePassword keystoreProps['HABITUAL_STORE_PASSWORD']
            keyAlias keystoreProps['HABITUAL_KEY_ALIAS']
            keyPassword keystoreProps['HABITUAL_KEY_PASSWORD']
        }`;

module.exports = function withAndroidSigning(config) {
  return withAppBuildGradle(config, (config) => {
    let { contents } = config.modResults;

    if (contents.includes("keystorePropsFile")) {
      return config;
    }

    // Inject keystore props loader before the android { block
    contents = contents.replace("android {", `${LOAD_KEYSTORE_PROPS}android {`);

    // Append release signing config after the debug signing config block
    contents = contents.replace(
      /(signingConfigs \{[\s\S]*?debug \{[\s\S]*?\})/,
      `$1\n${RELEASE_SIGNING_CONFIG}`
    );

    // Replace the release buildType's signingConfig
    contents = contents.replace(
      /\/\/ Caution! In production[\s\S]*?signingConfig signingConfigs\.debug/,
      "signingConfig signingConfigs.release"
    );

    config.modResults.contents = contents;
    return config;
  });
};
