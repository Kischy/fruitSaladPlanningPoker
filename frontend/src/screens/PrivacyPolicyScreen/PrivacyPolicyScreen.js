import React, { useState } from "react";
import {
  View,
  useWindowDimensions,
  StyleSheet,
  StatusBar,
  Text,
  Linking,
  Pressable
} from "react-native";
import { TopBar, Button } from "../../components";

import Colors from "./../../colors/colors";

export default function PrivacyPolicyScreen({ navigation }) {
  const { height, width } = useWindowDimensions();
  const fontSizeScale = 0.5 * (height + width);
  const fontSizeHeader = fontSizeScale * 0.0175;
  const fontSizeParagraph = fontSizeScale * 0.0125;

  const stylesInner = StyleSheet.create({
    headerText: {
      fontFamily: "Roboto_500Medium",
      marginBottom: "0.5em",
      fontSize: fontSizeHeader
    },
    paragraphText: {
      fontFamily: "Roboto_400Regular",
      marginBottom: "0.5em",
      fontSize: fontSizeParagraph 
    },
  });
  

  return (
    <View style={[styles.container, { width: width, height: height }]}>
      <StatusBar style="auto" />
      <TopBar
        style={{ height: height * 0.1, width: width }}
        navigation={navigation}
      />
      <View style={styles.containerBody}>
        <Text style={stylesInner.headerText}>
        Privacy Policy for Fruit salad planning poker
        </Text>   
        <Text style={stylesInner.paragraphText}>
        Last updated: October 23, 2022
        </Text>
        <Text style={stylesInner.paragraphText}>
        This Privacy Policy describes Our policies and procedures on the collection, use and disclosure of Your information when You use the Service and tells You about Your privacy rights and how the law protects You.
        </Text>
        <Text style={stylesInner.headerText}>
        Introduction
        </Text>
        <Text style={stylesInner.paragraphText}>
        This is a private just for fun project of myself using the firebase service by google. Note that this website does not use Google Analytics. For more information on firebase and its privacy policy visit:
        </Text>
        <Pressable onPress={() => {Linking.openURL('https://firebase.google.com/support/privacy')}}>
        <Text style={stylesInner.paragraphText}>
            https://firebase.google.com/support/privacy        
        </Text>
        </Pressable>
        <Text style={stylesInner.headerText}>
        Collecting and Using Your Personal Data
        </Text>
        <Text style={stylesInner.paragraphText}>
        While using Our Service, We may ask You to provide Us with certain personally identifiable information that can be used to contact or identify You. Personally identifiable information may include, but is not limited to:
        </Text>
        <Text style={stylesInner.paragraphText}>
        Usage Data
        </Text>
        <Text style={stylesInner.headerText}>
        Usage Data
        </Text>
        <Text style={stylesInner.paragraphText}>
        Usage Data is collected automatically when using the Website.{"\n"}
        Usage Data may include information such as Your Device's Internet Protocol address (e.g. IP address), browser type, browser version, the pages of our Service that You visit, the time and date of Your visit, the time spent on those pages, unique device identifiers and other diagnostic data.{"\n"}
        When You access the Service by or through a mobile device, We may collect certain information automatically, including, but not limited to, the type of mobile device You use, Your mobile device unique ID, the IP address of Your mobile device, Your mobile operating system, the type of mobile Internet browser You use, unique device identifiers and other diagnostic data.{"\n"}
        We may also collect information that Your browser sends whenever You visit our Service or when You access the Service by or through a mobile device.
        </Text>
        <Text style={stylesInner.headerText}>
        Tracking Technologies and Cookies
        </Text>
        <Text style={stylesInner.paragraphText}>
        We use Cookies and similar tracking technologies to track the activity on Our Service and store certain information. Tracking technologies used are beacons, tags, and scripts to collect and track information and to improve and analyse Our Service. The technologies We use may include:{"\n"}
        Cookies or Browser Cookies. A cookie is a small file placed on Your Device. You can instruct Your browser to refuse all Cookies or to indicate when a Cookie is being sent. However, if You do not accept Cookies, You may not be able to use some parts of our Service. Unless you have adjusted Your browser setting so that it will refuse Cookies, our Service may use Cookies.{"\n"}
        Web Beacons. Certain sections of our Service and our emails may contain small electronic files known as web beacons (also referred to as clear gifs, pixel tags, and single-pixel gifs) that permit us, for example, to count users who have visited those pages or opened an email and for other related website statistics (for example, recording the popularity of a certain section and verifying system and server integrity).{"\n"}
        Cookies can be "Persistent" or "Session" Cookies. Persistent Cookies remain on Your personal computer or mobile device when You go offline, while Session Cookies are deleted as soon as You close Your web browser.{"\n"}{"\n"}
        We use both Session and Persistent Cookies for the purposes set out below:{"\n"}{"\n"}
        Necessary / Essential Cookies, Type: Session Cookies, Administered by: Us{"\n"}{"\n"}
        Purpose: These Cookies are essential to provide You with services available through the Website and to enable You to use some of its features. They help to authenticate users and prevent fraudulent use of user accounts. Without these Cookies, the services that You have asked for cannot be provided, and We only use these Cookies to provide You with those services
        </Text>
        <Text style={stylesInner.headerText}>
        Security of Your Personal Data
        </Text>
        <Text style={stylesInner.paragraphText}>
        The security of Your Personal Data is important to Us, but remember that no method of transmission over the Internet, or method of electronic storage is 100% secure. While We strive to use commercially acceptable means to protect Your Personal Data, We cannot guarantee its absolute security.
        </Text>
        <Text style={stylesInner.headerText}>
        Children's Privacy
        </Text>  
        <Text style={stylesInner.paragraphText}>          
        Our Service does not address anyone under the age of 13. We do not knowingly collect personally identifiable information from anyone under the age of 13. If You are a parent or guardian and You are aware that Your child has provided Us with Personal Data, please contact Us. If We become aware that We have collected Personal Data from anyone under the age of 13 without verification of parental consent, We take steps to remove that information from Our servers.
        </Text> 
        <Text style={stylesInner.headerText}>
        Links to Other Websites
        </Text>  
        <Text style={stylesInner.paragraphText}>          
        Our Service may contain links to other websites that are not operated by Us. If You click on a third party link, You will be directed to that third party's site. We strongly advise You to review the Privacy Policy of every site You visit.{"\n"}{"\n"}
        We have no control over and assume no responsibility for the content, privacy policies or practices of any third party sites or services.
        </Text>       
        <Text style={stylesInner.headerText}>
        Changes to this Privacy Policy
        </Text>  
        <Text style={stylesInner.paragraphText}>          
        We may update Our Privacy Policy from time to time. We will notify You of any changes by posting the new Privacy Policy on this page. You are advised to review this Privacy Policy periodically for any changes. Changes to this Privacy Policy are effective when they are posted on this page.
        </Text> 
        <Text style={stylesInner.headerText}>
        Contact Us
        </Text>  
        <Text style={stylesInner.paragraphText}>          
        If you have any questions about this Privacy Policy, You can contact us by email: fruitsaladestimation@gmail.com
       </Text>  
      </View>
    </View>
  );
}

const styles = StyleSheet.create({

  container: {
    paddingTop: StatusBar.currentHeight,
    padding: "2.5%",
    flexDirection: "column",
    display: "flex",
    backgroundColor: "white"
  },
  containerBody: {
    width: "100%",
    paddingTop: "2.5%",
    paddingLeft: "5%",
  },
});
