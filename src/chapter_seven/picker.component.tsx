import * as React from 'react'

class PickerComponent extends React.Component<any,any> {
    render() {
        const { value, onChange, options } = this.props;

        return (
            <span>
                <h1>{value}</h1>
                <select onChange={e => onChange(e.target['value'])}
                        value={value}>
                    {options.map(option =>
                    <option value={option} key={option}>
                        {option}
                    </option>)
                        }
                </select>
            </span>
        )
    }
}

export default PickerComponent;
