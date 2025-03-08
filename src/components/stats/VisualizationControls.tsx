
import React from 'react';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';

interface VisualizationControlsProps {
  visualizationType: string;
  setVisualizationType: (value: string) => void;
  timeRange: string;
  setTimeRange: (value: string) => void;
  selectedCategory: string;
  setSelectedCategory: (value: string) => void;
  isDisabled: boolean;
}

const VisualizationControls: React.FC<VisualizationControlsProps> = ({
  visualizationType,
  setVisualizationType,
  timeRange,
  setTimeRange,
  selectedCategory,
  setSelectedCategory,
  isDisabled
}) => {
  return (
    <div className="flex flex-wrap gap-3">
      <Select value={visualizationType} onValueChange={setVisualizationType} disabled={isDisabled}>
        <SelectTrigger className="w-[180px]">
          <SelectValue placeholder="Visualization Type" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="population">Population Breakdown</SelectItem>
          <SelectItem value="income">Income Trends</SelectItem>
          <SelectItem value="footprint">Footprint Analysis</SelectItem>
          <SelectItem value="comparison">Society Comparison</SelectItem>
        </SelectContent>
      </Select>
      
      {visualizationType === 'income' && (
        <Select value={timeRange} onValueChange={setTimeRange} disabled={isDisabled}>
          <SelectTrigger className="w-[180px]">
            <SelectValue placeholder="Time Range" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Time</SelectItem>
            <SelectItem value="last3">Last 3 Years</SelectItem>
            <SelectItem value="last5">Last 5 Years</SelectItem>
          </SelectContent>
        </Select>
      )}
      
      {visualizationType === 'comparison' && (
        <Select value={selectedCategory} onValueChange={setSelectedCategory} disabled={isDisabled}>
          <SelectTrigger className="w-[180px]">
            <SelectValue placeholder="Category" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Categories</SelectItem>
            <SelectItem value="technology">Technology</SelectItem>
            <SelectItem value="sciences">Sciences</SelectItem>
            <SelectItem value="arts">Arts</SelectItem>
            <SelectItem value="politics">Politics</SelectItem>
          </SelectContent>
        </Select>
      )}
    </div>
  );
};

export default VisualizationControls;
