import React from 'react';
import { PropTypes } from 'prop-types';
import Input, { InputLabel } from 'material-ui/Input';
import { FormControl, FormHelperText } from 'material-ui/Form';
import { withStyles } from 'material-ui/styles';

const styles = theme => ({
    formControl: {
        margin: theme.spacing.unit,
    },
});

const TextField = ({ input, label, type, name, meta: { touched, error, warning } }, classes) => (
    <div>
        {(touched && (error || warning) &&
            <FormControl error aria-describedby={name} className={classes.formControl}>
                <InputLabel htmlFor={name}>{label}</InputLabel>
                <Input {...input} type={type} />
                {
                    (error && <FormHelperText id={name}>{error}</FormHelperText>) ||
                    (warning && <FormHelperText id={name}>{warning}</FormHelperText>)
                }
            </FormControl>
        ) ||
            <FormControl aria-describedby={name} className={classes.formControl}>
                <InputLabel htmlFor={name}>{label}</InputLabel>
                <Input {...input} type={type} />
            </FormControl>
        }
    </div>
)

TextField.propTypes = {
    input: PropTypes.any,
    label: PropTypes.any,
    type: PropTypes.any,
    name: PropTypes.any,
    meta: PropTypes.any,
}

export default withStyles(styles)(TextField);
