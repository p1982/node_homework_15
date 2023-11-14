type ButtonType = 'button' | 'submit' | 'reset';
export const buttonConfig: Record<string, { text: string; className: string, type: ButtonType }> = {
    delete: {
        text: 'Delete',
        className: 'bg-red-600 rounded border-none py-2 px-5',
        type: 'button'
    },
    createPost: {
        text: 'Create Post',
        className: 'bg-red-600 rounded border-none py-2 px-5',
        type: 'submit'
    },
    updatePost: {
        text: 'Update Post',
        className: 'bg-red-600 rounded border-none py-2 px-5',
        type: 'submit'
    },
    login: {
        text: 'Log In',
        className: 'bg-red-600 rounded border-none py-2 px-5',
        type: 'submit'
    },
    signup: {
        text: 'Sign Up',
        className: 'bg-red-600 rounded border-none py-2 px-5',
        type: 'submit'
    },
    logout: {
        text: 'Log Out',
        className: 'bg-red-600 rounded border-none py-2 px-5',
        type: 'submit'
    },
}