import { Form } from "react-bootstrap"
import { useController } from "react-hook-form"
import Select from "react-select"
export const EmailInputComponent = ({ control, errMsg, name }) => {
    const emailController = useController({
        name: name,
        control,
        defaultValue: "",
        // rules: {
        //     required: "Email is required",
        //     pattern: {
        //         value: /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|.(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
        //         message:"Invalid email format"
        //     }
        // }
    })
    return (<>
        <Form.Control
            type="email"
            {...emailController.field}
            placeholder="Enter your user name"
            size="sm"
        />
        <span className="text-danger">{errMsg}</span>
    </>)
}
export const TextInputComponent = ({ control, errMsg, name }) => {
    const textController = useController({
        name: name,
        control,
        defaultValue: "",

    })
    return (<>
        <Form.Control
            type="text"
            {...textController.field}
            placeholder={`Enter your ${name}`}
            size="sm"
        />
        <span className="text-danger">{errMsg}</span>
    </>)
}
export const URLInputComponent = ({ control, errMsg, name }) => {
    const urlController = useController({
        name: name,
        control,
        defaultValue: "",

    })
    return (<>
        <Form.Control
            type="url"
            {...urlController.field}
            placeholder={`Enter your ${name}`}
            size="sm"
        />
        <span className="text-danger">{errMsg}</span>
    </>)
}
export const TextAreaInputComponent = ({ control, errMsg, name }) => {
    const textAreaController = useController({
        name: name,
        control,
        defaultValue: "",

    })
    return (<>
        <Form.Control
            as="textarea"
            {...textAreaController.field}
            placeholder={`Enter your ${name}`}
            size="sm"
            rows={5}
            style={{ resize: "none" }}
        />
        <span className="text-danger">{errMsg}</span>
    </>)
}
export const SelectDropdownComponent = ({ errMsg, name, options, setValue,defaultValue,isMultiple=false }) => {
    
    return (<>
        <Select
            options={options}
            isClearable
            name={name}
            isMulti={isMultiple}
            onChange={(selOpts) => {
                setValue(name, selOpts)
            }}
            defaultValue={defaultValue}
            className="form-select-sm"
        />
        <span className="text-danger">{errMsg}</span>
    </>)
}
export const PasswordInput = ({ control, errMsg, name }) => {
    const passwordController = useController({
        name: name,
        control,
        defaultValue: "",
        // rules: {
        //     required: "Password is required",
        //     minLength: {
        //         value: 8,
        //         message:"Password must be atleast 8 character long"
        //    }
        // }
    })
    return (<>
        <Form.Control
            type="password"
            {...passwordController.field}
            placeholder="Enter your password"
            size="sm"
        />
        <span className="text-danger">{errMsg}</span>

    </>)
}
export const ImageUpoloaderComponent = ({ setError, setThumb,name,control,errMsg,setValue }) => {
    const ImageUpoloaderController = useController({
        name: name,
        control
    })
    return (<>
        <Form.Control
            type="file"
            size="sm"
            accept="image/*"
            onChange={(e) => {
                const { files } = e.target;
                const allowed = ['jpg', 'jpeg', 'png', 'gip', 'svg', 'webp', 'bmp'];
                const image = files[0];
                //size,format validation for image
                let ext = image.name.split(".").pop();
                if (!allowed.includes(ext.toLowerCase())) {
                    setError(name, { message: "Image format not supported" })
                } else {
                    if (image.size <= 3000000) {
                        setThumb(image)
                        setValue(name,image)
                    } else {
                        setError(name, { message: "Image size should be less than 3mb" })
                    }
                }
                // console.log(image)
                // setThumb(image)
            }}
        />
    </>)
}