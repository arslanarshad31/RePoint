import React from 'react'
import { Button, Card, Image } from 'semantic-ui-react'

export default class Shop extends React.Component{
    render(){
        return (<Card.Group>
                {["SC", "HSBC", "CITI"].map((v) => {
                    return (<ShopItem name={v}/>)
                })}
            </Card.Group>)
    }
}

class ShopItem extends React.Component{
    render(){
        return (
            <Card fluid color='orange' header={this.props.name}>
                <img src="http://placehold.it/50x50" />
            </Card>
        )
    }
}