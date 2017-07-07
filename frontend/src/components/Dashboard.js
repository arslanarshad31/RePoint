import React from "react";
import { Button, Card, Image } from 'semantic-ui-react'

export default class Dashboard extends React.Component {
  render() {
    return (
      <Card.Group>
        {([{name: "SC", pts:1000}, {name: "HSBC", pts:1000}, {name:"CITI", pts:500}]).map((val)=>{
            return(<DashItem name={val.name} pts={val.pts}/>)
        })}
      </Card.Group>
    );
  }
}

class DashItem extends React.Component {
  render(){
    return (
       <Card style={{"margin":"10px auto", "width": "90%"}}>
      <Card.Content>
        <Image floated='right' size='mini' src='https://dummyimage.com/600x600' />
        <Card.Header>
          {this.props.name}
        </Card.Header>
        <Card.Meta>
          Account: 85297023133
        </Card.Meta>
        
      </Card.Content>
      <Card.Content extra>
        <div className='ui two buttons'>
          <Button basic >{this.props.pts} Points</Button>
          <Button basic >14 pts = HK$1</Button>
        </div>
      </Card.Content>
    </Card>
    )
  }
}

/*class DashItem extends React.Component {
  render() {
    return (
      <List.Item>
        <Image avatar src="https://dummyimage.com/600x400/000/fff" />
        <List.Content>
          <List.Header>{this.props.name}</List.Header>
          {this.props.pts} points
        </List.Content>
      </List.Item>
    );
  }
}*/
