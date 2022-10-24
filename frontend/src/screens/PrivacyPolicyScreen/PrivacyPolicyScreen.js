import React from "react";
import {
  ScrollView,
  View,
  useWindowDimensions,
  StyleSheet,
  StatusBar,
  Text,
  Linking,
  Pressable
} from "react-native";
import { TopBar } from "../../components";
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
    <ScrollView style={[styles.container, { width: width, height: height }]}>
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
        This Privacy Policy describes this Websites policies and procedures on the collection, use and disclosure of Your information when You use the Service and tells You about Your privacy rights and how the law protects You.
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
        While using this Websites Service, it may ask You to provide this Website with certain personally identifiable information that can be used to contact or identify You. Personally identifiable information may include, but is not limited to:
        </Text>
        <Text style={stylesInner.paragraphText}>
        Usage Data
        </Text>
        <Text style={stylesInner.headerText}>
        Usage Data
        </Text>
        <Text style={stylesInner.paragraphText}>
        Usage Data is collected automatically when using this Website.{"\n"}
        Usage Data may include information such as Your Device's Internet Protocol address (e.g. IP address), browser type, browser version, the pages of our Service that You visit, the time and date of Your visit, the time spent on those pages, unique device identifiers and other diagnostic data.{"\n"}
        When You access the Service by or through a mobile device, this Website may collect certain information automatically, including, but not limited to, the type of mobile device You use, Your mobile device unique ID, the IP address of Your mobile device, Your mobile operating system, the type of mobile Internet browser You use, unique device identifiers and other diagnostic data.{"\n"}
        This Website may also collect information that Your browser sends whenever You visit our Service or when You access the Service by or through a mobile device.
        </Text>
        <Text style={stylesInner.headerText}>
        Tracking Technologies and Cookies
        </Text>
        <Text style={stylesInner.paragraphText}>
        This Website uses Cookies and similar tracking technologies to track the activity on Our Service and store certain information. Tracking technologies used are beacons, tags, and scripts to collect and track information and to improve and analyse Our Service. The technologies this Website uses may include:{"\n"}
        Cookies or Browser Cookies. A cookie is a small file placed on Your Device. You can instruct Your browser to refuse all Cookies or to indicate when a Cookie is being sent. However, if You do not accept Cookies, You may not be able to use some parts of our Service. Unless you have adjusted Your browser setting so that it will refuse Cookies, our Service may use Cookies.{"\n"}
        Web Beacons. Certain sections of our Service and our emails may contain small electronic files known as web beacons (also referred to as clear gifs, pixel tags, and single-pixel gifs) that permit this Website, for example, to count users who have visited those pages or opened an email and for other related website statistics (for example, recording the popularity of a certain section and verifying system and server integrity).{"\n"}
        Cookies can be "Persistent" or "Session" Cookies. Persistent Cookies remain on Your personal computer or mobile device when You go offline, while Session Cookies are deleted as soon as You close Your web browser.{"\n"}{"\n"}
        this Website uses both Session Cookies for the purposes set out below:{"\n"}{"\n"}
        Necessary / Essential Cookies, Type: Session Cookies, Administered by: This Website{"\n"}{"\n"}
        Purpose: These Cookies are essential to provide You with services available through this Website and to enable You to use some of its features. They help to authenticate users and prevent fraudulent use of user accounts. Without these Cookies, the services that You have asked for cannot be provided, and this Website only uses these Cookies to provide You with those services
        </Text>
        <Text style={stylesInner.headerText}>
        Security of Your Personal Data
        </Text>
        <Text style={stylesInner.paragraphText}>
        The security of Your Personal Data is important to me, but remember that no method of transmission over the Internet, or method of electronic storage is 100% secure. While I strive to use commercially acceptable means to protect Your Personal Data, I cannot guarantee its absolute security.
        </Text>
        <Text style={stylesInner.headerText}>
        Children's Privacy
        </Text>  
        <Text style={stylesInner.paragraphText}>          
        This Website does not address anyone under the age of 13. This Website does not knowingly collect personally identifiable information from anyone under the age of 13. If You are a parent or guardian and You are aware that Your child has provided this Website with Personal Data, please contact me. If I become aware that this Website has collected Personal Data from anyone under the age of 13 without verification of parental consent, I take steps to remove that information from firebase servers.
        </Text> 
        <Text style={stylesInner.headerText}>
        Links to Other Websites
        </Text>  
        <Text style={stylesInner.paragraphText}>          
        This Website Service may contain links to other websites that are not operated by me. If You click on a third party link, You will be directed to that third party's site. I strongly advise You to reScrollView the Privacy Policy of every site You visit.{"\n"}{"\n"}
        I have no control over and assume no responsibility for the content, privacy policies or practices of any third party sites or services.
        </Text>       
        <Text style={stylesInner.headerText}>
        Changes to this Privacy Policy
        </Text>  
        <Text style={stylesInner.paragraphText}>          
        I may update this Websites Privacy Policy from time to time. I will notify You of any changes by posting the new Privacy Policy on this page. You are advised to reScrollView this Privacy Policy periodically for any changes. Changes to this Privacy Policy are effective when they are posted on this page.
        </Text> 
        <Text style={stylesInner.headerText}>
        Contact Me
        </Text>  
        <Text style={stylesInner.paragraphText}>          
        If you have any questions about this Privacy Policy, You can contact me by email: fruitsaladestimation@gmail.com
       </Text>  
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({

  container: {
    paddingTop: StatusBar.currentHeight,
    padding: "2.5%",
    flexDirection: "column",
    display: "flex",
    backgroundColor: Colors.backgroundGreyTone,
  },
  containerBody: {
    width: "100%",
    paddingTop: "2.5%",
    paddingLeft: "5%",
  },
});
