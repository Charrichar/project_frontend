///////////needs to go in app.js/////////////
import {BackgroundCarousel} from "./BackgroundCarousel"
///////////needs to go in app.js/////////////




import * as React from 'react'
import {StyleSheet, View, ScrollView, Dimensions, Image} from 'react-native'


const DEVICE_WIDTH = Dimensions.get("window").width;


class BackgroundCarousel extends React.Component {
  scrollRef = React.createRef()
  constructor(props){
    super(props)

    this.state = {
      selectedIndex: 0
    }
  }

  render(){
    const {images} = this.props
    const {selectedIndex} = this.state
    return(
      <View style={{height: "100%", width: "100%"}}>
      <ScrollView>
      {images.map(image => (
        <image
          key={image}
          source={(uri: image)}
          style={styles.backgroundImage}
          />
      ))}
      </ScrollView>
      </View>
    )
  }
}

export {BackgroundCarousel}


const images = [
  "https://images.unsplash.com/photo-1490814525860-594e82bfd34a?ixid=MnwxMjA3fDB8MHxzZWFyY2h8OXx8YmxhY2slMjBhbmQlMjB3aGl0ZXxlbnwwfHwwfHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60",
  "https://images.unsplash.com/photo-1529432337323-223e988a90fb?ixid=MnwxMjA3fDB8MHxzZWFyY2h8OHx8YmxhY2slMjBhbmQlMjB3aGl0ZXxlbnwwfHwwfHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60",
  "https://images.unsplash.com/photo-1549281899-f75600a24107?ixid=MnwxMjA3fDB8MHxzZWFyY2h8MjJ8fGJsYWNrJTIwYW5kJTIwd2hpdGV8ZW58MHx8MHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60",
  "https://images.unsplash.com/photo-1557428894-56bcc97113fe?ixid=MnwxMjA3fDB8MHxzZWFyY2h8MTh8fG5ld3N8ZW58MHx8MHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60"
]
