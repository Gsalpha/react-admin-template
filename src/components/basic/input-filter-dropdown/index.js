import React, { Component } from 'react'
import { Input, Button } from 'antd'
import PropTypes from 'prop-types'
import styled from './index.module.scss'

class InputFilterDropdown extends Component {
    static propTypes = {
        selectedKeys: PropTypes.array,
        setSelectedKeys: PropTypes.func,
        clearFilters: PropTypes.func,
        confirm: PropTypes.func,
        columnKey: PropTypes.string,
        onFilter: PropTypes.func
    }
    handleFilterChange = ev => {
        const value = ev.target.value.trim()
        this.props.setSelectedKeys(value ? [value] : [])
    }
    handleTypeEnter = () => {
        const { selectedKeys, onFilter, columnKey, confirm } = this.props
        confirm()
        onFilter(selectedKeys[0], columnKey)
    }
    clear = () => {
        const { clearFilters } = this.props
        clearFilters()
    }
    handleClear = () => {
        const { onFilter, columnKey } = this.props
        this.clear()
        onFilter('', columnKey)
    }

    render() {
        const { selectedKeys } = this.props
        return (
            <section className={styled['filter-input']}>
                <Input
                    placeholder="请输入检索条件"
                    value={selectedKeys[0]}
                    onChange={this.handleFilterChange}
                    onPressEnter={this.handleTypeEnter}
                />
                <Button type="primary" onClick={this.handleTypeEnter}>
                    搜索
                </Button>
                <Button onClick={this.handleClear}>重置</Button>
            </section>
        )
    }
}

export default InputFilterDropdown
