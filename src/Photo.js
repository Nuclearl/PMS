import React from "react";
import { Col, Row, Grid } from 'react-native-easy-grid'
import {
  StyleSheet,
  View,
  Text,
  Image,
  FlatList,
  TouchableOpacity,
  ScrollView
} from "react-native";
import images from "./Photos";
import BaseManager from "./database";
const manager = new BaseManager();

class Gallery extends React.Component {




  constructor(props) {
    super(props);
    this.getPhoto()
    this.state = { dataSource: images };
  }


  componentWillMount = () => {
    this.getPhoto()
    this.setState({ dataSource: images });
  };

  componentDidMount() {
    const { navigation } = this.props;

    this.focusListener = navigation.addListener("focus", () => {
      this.setState({ dataSource: this.state.dataSource });
    });
  }

  componentWillUnmount() {
    if (this.focusListener != null && this.focusListener.remove) {
      this.focusListener.remove();
    }
  }


  getPhoto(){
    this.timeoutPromise(1000, fetch(`https://pixabay.com/api/?key=19193969-87191e5db266905fe8936d565&q=night+city&image_type=photo&per_page=27`)
      .then(respsonse => respsonse.json())
      .then(data => {
        for (let i = 0; i < data.hits.length; i+=1) {
          if(!images.includes(data.hits[i].largeImageURL)) {
            images.push(data.hits[i].largeImageURL);
            manager.addGallery(data.hits[i].largeImageURL)
          }
        }
      })
      .catch(error => {
        console.log(error)
      })
      .finally(()=>{
        this.setState({loading:false});
      })).catch(error => {
      manager.selectGallery(req).then(temp =>  images = data.hits[i].largeImageURL);

    });

  }

  timeoutPromise(ms, promise) {
    return new Promise((resolve, reject) => {
      const timeoutId = setTimeout(() => {
        reject(new Error("promise timeout"))
      }, ms);
      promise.then(
        (res) => {
          clearTimeout(timeoutId);
          resolve(res);
        },
        (err) => {
          clearTimeout(timeoutId);
          reject(err);
        }
      );
    })
  }


  render() {
    const cur_images = []
    console.log(this.state.dataSource)
    for (let i = 0; i < this.state.dataSource.length; i+=3) {
      cur_images.push(this.state.dataSource.slice(i, i+3));
    }
    console.log(cur_images)
    const column_height = 150
    return (
      <>
        <ScrollView style={{ flex: 1 }}>
          <Grid>
            {cur_images.map(function(image, index) {
              if ((index-1)%3===0){
                return (
                  <Row style={{height: column_height*2}}>
                    <Col>
                      {image[0]? <Row style={gridLeft( column_height)} size={1}><Image source={{ uri: image[0] }} style={styles.img}/></Row>: <Row style={gridLeft(column_height, null)} size={1}></Row>}
                      {image[2]? <Row style={gridLeft( column_height)} size={1}><Image source={{ uri: image[2] }} style={styles.img}/></Row>: <Row style={gridLeft(column_height, null)} size={1}></Row>}
                    </Col>
                    {image[1]? <Col style={gridCenter( column_height*2)} size={2}><Image source={{ uri: image[1] }} style={styles.img}/></Col>:<Col style={gridCenter( column_height*2, null)} size={2}></Col>}
                  </Row>
                )
              }else{
                return (
                    <Row style={{height:  column_height}}>
                      {image[0]? <Row style={gridLeft( column_height)} size={1}><Image source={{ uri: image[0] }} style={styles.img}/></Row>: <Row style={gridLeft(column_height, null)} size={1}></Row>}
                      {image[1]? <Row style={gridCenter( column_height)} size={1}><Image source={{ uri: image[1] }} style={styles.img}/></Row>: <Row style={gridCenter(column_height, null)} size={1}></Row>}
                      {image[2]? <Row style={gridRight( column_height)} size={1}><Image source={{ uri: image[1] }} style={styles.img}/></Row>: <Row style={gridRight(column_height, null)} size={1}></Row>}
                    </Row>
                  )
              }
            })}
          </Grid>
        </ScrollView>
      </>

    )
  }
}

const styles = StyleSheet.create({
  container: {
    padding: 50,
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
  imageSmall: {
    /* flex: 1, */
    width: 100,
    height: 100,
  },
  box: {
    width: 50,
    height: 50,
  },
  img: { width: '100%', height: '100%' },
  content: {
    backgroundColor: 'black',
  },

});

const gridLeft = function(height, color='gray') {
  const style = {
    marginBottom: 2,
    marginRight: 2,
    paddingBottom: height*0.13,
    paddingTop: height*0.13,
  }
  if(color) {
    style.backgroundColor = color
  }
  return style
}

const gridCenter = function(height, color='gray') {
  const style = {
    marginBottom: 2,
    paddingBottom: height*0.13,
    paddingTop: height*0.13,
  }
  if(color) {
    style.backgroundColor = color
  }
  return style
}


const gridRight = function(height, color='gray') {
  const style = {
    marginBottom: 2,
    marginLeft: 2,
    paddingBottom: height*0.13,
    paddingTop: height*0.13,
  }
  if(color) {
    style.backgroundColor = color
  }
  return style
}
export default Gallery;
