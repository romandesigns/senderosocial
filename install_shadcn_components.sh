#!/bin/bash


# Array of all shadcn component names
components=("sidebar" "new" "accordion" "alert" "alert-dialog" "aspect-ratio" "avatar" "badge" "breadcrumb" "button" "calendar" "card" "carousel" "chart" "checkbox" "collapsible" "combobox" "command" "context-menu" "data-table" "date-picker" "dialog" "drawer" "dropdown-menu" "form" "hover-card" "input" "input-otp" "label" "menubar" "navigation-menu" "pagination" "popover" "progress" "radio-group" "resizable" "scroll-area" "select" "separator" "sheet" "skeleton" "slider" "sonner" "switch" "table" "tabs" "textarea" "toast" "toggle" "toggle-group" "tooltip")
   

# Function to install a component (Use suitable library shadcn or shadcn-ui)
install_component() {
    component=$1
    echo "Installing $component..."
    #npx shadcn-ui@latest add $component 
    npx shadcn@latest add $component
}


# Main installation loop
for component in "${components[@]}"
do
    install_component $component
done


echo "All shadcn components have been installed successfully!"