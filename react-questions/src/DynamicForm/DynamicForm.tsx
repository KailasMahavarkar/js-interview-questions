'use client'

import React, { useState } from 'react'
import { DynamicFormProps, FormElementConfig } from '../types/types'
import { Input, Button, Label, Select, Radio } from '../components'

export const DynamicForm: React.FC<DynamicFormProps> = ({ config, onSubmit }) => {
    const [formData, setFormData] = useState<Record<string, string>>({})

    const handleInputChange = (key: string, value: string) => {
        setFormData(prevData => ({ ...prevData, [key]: value }))
    }

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault()
        console.log(formData)
        onSubmit(formData)
    }

    const renderFormElement = (element: FormElementConfig) => {
        switch (element.type) {
            case 'text':
                return (
                    <div key={element.key} className="mb-4">
                        <Label htmlFor={element.key}>
                            {element.label}
                        </Label>
                        <Input
                            type="text"
                            id={element.key}
                            value={formData[element.key] || ''}
                            onChange={(e) => handleInputChange(element.key, e.target.value)}
                            placeholder={element.placeholder}
                        />
                    </div>
                )
            case 'select':
                return (
                    <div key={element.key} className="mb-4">
                        <Label htmlFor={element.key}>
                            {element.label}
                        </Label>
                        <Select
                            value={formData[element.key] || ''}
                            onChange={(e) => handleInputChange(element.key, e.target.value)}
                            options={element.children || []}
                        />
                    </div>
                )
            case 'radio':
                return (
                    <div key={element.key} className="mb-4">
                        <Radio
                            multiSelect={element.multiple}
                            options={element.children || []}
                            selectedValues={formData[element.key] ? formData[element.key].split(',') : []}
                            onChange={(selected) => handleInputChange(element.key, selected.join(','))}
                        />
                    </div>
                )

            default:
                return null
        }
    }

    return (
        <form onSubmit={handleSubmit} className="space-y-4">
            {config.map(renderFormElement)}
            <Button type="submit">
                Submit
            </Button>
        </form>
    )
}
