import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { DatePicker } from 'antd'
import moment from 'moment'

class DatePickerFilterDropdown extends Component {
    static propTypes = {
        columnKey: PropTypes.string,
        onFilter: PropTypes.func,
        type: PropTypes.oneOf(['DatePicker', 'RangePicker']),
        setSelectedKeys: PropTypes.func,
        selectedKeys: PropTypes.array,
        clearFilters: PropTypes.func,
        confirm: PropTypes.func
    }
    clear = () => {
        this.handleChange([null, null], ['', ''])
    }

    handleChange = (date, dateString) => {
        const {
            onFilter,
            columnKey,
            setSelectedKeys,
            confirm,
            clearFilters
        } = this.props
        const isArrayOfDateString = Array.isArray(dateString)
        const data = isArrayOfDateString ? dateString : [dateString]
        setSelectedKeys(data)
        onFilter(data, columnKey)
        setTimeout(() => {
            if (dateString) {
                if (isArrayOfDateString) {
                    if (dateString[0]) {
                        confirm()
                    } else {
                        clearFilters()
                    }
                } else {
                    confirm()
                }
            } else {
                clearFilters()
            }
        }, 0)
    }

    render() {
        // 提取prefixCls 避免css-module影响
        const { type, prefixCls, selectedKeys, format, ...rest } = this.props
        const Picker = type === 'DatePicker' ? DatePicker : DatePicker[type]
        return (
            <Picker
                {...rest}
                value={
                    selectedKeys[0]
                        ? [
                              moment(selectedKeys[0], format),
                              moment(selectedKeys[1], format)
                          ]
                        : [null, null]
                }
                onChange={this.handleChange}
            />
        )
    }
}

export default DatePickerFilterDropdown
