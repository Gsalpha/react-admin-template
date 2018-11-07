import React from 'react'
import Button from 'components/basic/authorized-button'
class Ta extends React.Component {
    handleClick = ev => {
        console.log(1)
    }
    render() {
        return (
            <>
                <Button onClick={this.handleClick} feature={'test'}>
                    测试
                </Button>
            </>
        )
    }
}
export default Ta
